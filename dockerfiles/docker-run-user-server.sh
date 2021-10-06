docker build -t user-server  .. -f ./user.Dockerfile
docker run -d -p 3701:3701 --name user-server user-server 
