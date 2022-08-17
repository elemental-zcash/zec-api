FROM node:16-bullseye-slim

RUN apt-get update -y
RUN apt-get install -y wget unzip jq curl httpie # buildkit
RUN wget https://github.com/adityapk00/zecwallet-light-cli/releases/download/v1.8.0-beta2/linux-zecwallet-cli-v1.8.0-beta2.zip
RUN unzip linux-zecwallet-cli-v1.8.0-beta2.zip
RUN cp linux-zecwallet-cli-v1.8.0-beta2/zecwallet-cli /usr/local/bin/
RUN chmod +x /usr/local/bin/zecwallet-cli
# COPY ./entrypoint.sh /
# RUN chmod +x /entrypoint.sh
# CMD ["/entrypoint.sh"]

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8088
CMD ["node", "src/index.js"]
