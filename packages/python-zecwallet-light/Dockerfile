FROM python:3.10.7-slim-bullseye

# install dependencies
RUN apt-get update -y
RUN apt-get install -y wget unzip jq curl httpie # buildkit
RUN pip install --upgrade pip

RUN wget https://github.com/adityapk00/zecwallet-light-cli/releases/download/v1.8.0-beta2/linux-zecwallet-cli-v1.8.0-beta2.zip
RUN unzip linux-zecwallet-cli-v1.8.0-beta2.zip
RUN cp linux-zecwallet-cli-v1.8.0-beta2/zecwallet-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/zecwallet-cli
