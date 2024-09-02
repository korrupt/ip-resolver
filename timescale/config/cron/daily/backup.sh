#!/bin/sh

echo "CREATING BACKUP"

DATESTR=$(date +%Y-%m-%d-%T)

pg_dump -U $POSTGRES_USER $POSTGRES_DATABASE -Z 9 \
        -f "/usr/src/backups/$DATESTR.bak" || (echo "Error backing up, canceling cleanup" && exit 1)

echo "SUCCESS";
