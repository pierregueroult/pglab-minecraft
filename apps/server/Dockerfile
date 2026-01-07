FROM eclipse-temurin:21-jre-alpine

WORKDIR /minecraft

RUN apk add --no-cache bash dos2unix

# copy root files
COPY server.jar .
COPY launch.sh .
COPY eula.txt .
COPY allowed_symlinks.txt .
COPY server-icon.png .
COPY server.properties .

# copy folders
COPY mods ./mods
COPY datapacks ./datapacks
COPY config ./config

# the settings folder must be created before the server starts and mounts it
RUN mkdir settings

RUN chmod +x launch.sh

EXPOSE 25565
EXPOSE 24454/udp
EXPOSE 25575
EXPOSE 8100

CMD ["./launch.sh"]
