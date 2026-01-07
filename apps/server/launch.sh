#!/bin/bash

CONFIG_DIRECTORY="settings"
DATAPACKS_DIRECTORY="datapacks"
CONFIG_FILES=("ops.json" "whitelist.json" "banned-ips.json" "banned-players.json" "usercache.json")

# the config directory exists (/minecraft/settings), but we are not sure the files does. We mustt create them if they do not exist
# then we should link those files in the directory of this script (/minecraft)

for file in ${CONFIG_FILES[@]}; do
    if [ ! -f "$CONFIG_DIRECTORY/$file" ]; then
        touch "$CONFIG_DIRECTORY/$file"
    fi
    ln -s "$CONFIG_DIRECTORY/$file" "$file"
done

# the datapacks are mounted in the directory of this script (/minecraft/datapacks)
# for each one we should create a link in the world directory (/minecraft/world/datapacks)
# just before we should make sure the world directory exists and the world/datapacks directory exists

if [ ! -d "./world" ]; then
    mkdir "./world"
fi

if [ ! -d "./world/datapacks" ]; then
    mkdir "./world/datapacks"
fi

for file in "$DATAPACKS_DIRECTORY"/*; do
    filename=$(basename "$file")
    ln -sf "$(pwd)/$DATAPACKS_DIRECTORY/$filename" "world/datapacks/$filename"
done

java -Xms4G -Xmx7G -jar server.jar nogui
