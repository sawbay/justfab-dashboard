# Appwrite Functions
## Login using Appwrite CLI
```
appwrite login --email lnp279@gmail.com --password jiwsoK-pidqa8-jifnyk --endpoint https://appwrite.justfab.wtf/v1
```

## Push code
```
cd worker-api
appwrite functions create-deployment \
    --function-id=684956bd00380cd0efb9 \
    --entrypoint='src/main.js' \ 
    --code="." \
    --activate=true
```
