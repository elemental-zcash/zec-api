import docker

# Create a Docker client
client = docker.from_env()

# Build the Docker image from the Dockerfile in the current directory
def build_image(image_name, rm=False):
    # image, _ = client.images.build(path='../server', tag=image_name)
    build_output = client.api.build(path='../server', tag=image_name, rm=rm, forcerm=rm, decode=True)
    
    for line in build_output:
        if 'stream' in line:
            print(line['stream'].strip())  # Log the build output
        elif 'error' in line:
            print(line['error'].strip())  # Log any build errors

    # Find the newly built image by tag
    image = client.images.get(image_name)

    return image

build_image('zec-api-test')

# Create the constant service
def create_constant_service():
    service_spec = {
        'name': 'constant-service',
        'image': 'zec-api-test',
        # 'task_template': {
        #     'container_spec': {
        #         # Set other container configurations as needed
        #     },
        #     # Set other task/template options as needed
        # },
        'mode': {
            'replicated': {
                'replicas': 1,  # Single replica for the constant service
            },
        },
        # Set other service options as needed
    }

    client.services.create(**service_spec)

# create_constant_service()

# # Create function services dynamically
# def create_function_service(function_name, replicas):
#     service_spec = {
#         'name': f'{function_name}-service',
#         'task_template': {
#             'container_spec': {
#                 'image': 'your-docker-image',
#                 # Set other container configurations as needed
#             },
#             # Set other task/template options as needed
#         },
#         'mode': {
#             'replicated': {
#                 'replicas': replicas,  # Number of replicas for the function service
#             },
#         },
#         # Set other service options as needed
#     }

#     client.services.create(**service_spec)

# # Manage function services
# def scale_function_service(function_name, replicas):
#     service = client.services.get(f'{function_name}-service')
#     service.update({'mode': {'replicated': {'replicas': replicas}}})

# def remove_function_service(function_name):
#     service = client.services.get(f'{function_name}-service')
#     service.remove()

# # Usage
# create_constant_service()
# create_function_service('my-function', 3)
# scale_function_service('my-function', 5)
# remove_function_service('my-function')


