# fcc-file-metadata
[freecodecamp](https://www.freecodecamp.com/challenges/file-metadata-microservice) filesize upload service. using nodejs with express and multer packages.

## demo
visit [https://lee182-fcc-file-metadata.herokuapp.com/](https://lee182-fcc-file-metadata.herokuapp.com/)

## description
* AJAX fileupload on frontend
* multer expressjs on backend

## flow
1. client: browse and select file
2. client: click submit
3. client: sends multipart POST req
4. server: multer handles incomming data and populates req.file
5. server: replies parsing req.file
6. client: confirms upload showing response

## author
Author: [Jonathan T L Lee](https://github.com/Lee182)

Licence: MIT

Repo: [https://github.com/Lee182/fcc-file-microservice]( https://github.com/Lee182/fcc-file-microservice)
