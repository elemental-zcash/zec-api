# FROM node:16-bullseye-slim
FROM 1337bytes/python-zecwallet-light:latest

# RUN apt-get update \
#     && apt-get -y install libpq-dev gcc \
#     && pip install psycopg2

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# COPY ./entrypoint.sh /
# RUN chmod +x /entrypoint.sh
# CMD ["/entrypoint.sh"]

# Create app directory
WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY zeclight/ /usr/src/app/

# COPY package*.json ./

# RUN npm install

# Bundle app source
COPY . .

EXPOSE 5050
# CMD ["node", "src/index.js"]
ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:5050", "wsgi:app"]
