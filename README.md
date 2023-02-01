# Web-Based MARS-UI

## Running the UI
This UI consists of a Javascript/React frontend and a ROS backend. In order to send information to the robot over ROS, you will need to start the rosbridge server -- this is what allows us to send ROS messages from a web browser. Of course, you'll also need to start the web app. 

Note that the following commands must be run from an **Ubuntu OS**. If you have not completed the steps in [System Setup/Requirements](#system-setup/requirements), you must do those before attempting to run the UI.

### 1. Get Updated Code and Package Dependencies
Make sure you've run ```git pull``` and ```npm install```.

### 2. Start Rosbrige Server
In a terminal window, run ```roslaunch rosbridge_server rosbridge_websocket.launch```.

### 3. Run the Web App
In another terminal window, navigate to this repo on your machine. Run ```npm start```. A browser window should automatically open with the web UI running in it.

## System Setup/Requirements
You must run this UI from an Ubuntu OS. We are using Ubuntu 20.04, as this is compatible with the ROS distribution that we use, but other versions of Ubuntu may also work. 

Additionally, you must have ROS installed. We are using ROS noetic. If you want to try running this UI with another ROS distro, you will have to modify the command in [Setting up Rosbridge Server](#4-setting-up-rosbridge-server) accordingly.

### 1. Install NodeJS
To run a React web app, you will need to have Node installed. Run the following commands to install it using nvm:

1. ```sudo apt install curl```. 
2. ```curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash```. 
3. ```source ~/.bashrc```. 
4. ```nvm install v16.17.1```.

### 2. Clone the Repo
Use git to clone the repository: 
1. ```git clone git@github.com:MARS-UVA/mars-ui-web.git``` OR ```git clone https://github.com/MARS-UVA/mars-ui-web.git```. 
2. ```cd mars-ui-web```.

### 3. Install Package Dependencies
Run ```npm install```. Note that during development, you may periodically need to run this after pulling changes from the remote repo.

### 4. Set up Rosbridge Server
Run ```sudo apt install ros-noetic-rosbridge-server```.

## Component Map
![image](https://user-images.githubusercontent.com/47730411/213934394-021b2c68-7480-42ff-a2e3-8f96591e2ac9.png)

Note: the ButtonPanel has been renamed to DriveModeButtonPanel.

![image](https://user-images.githubusercontent.com/47730411/213934400-5c73b3a3-a1d9-4e89-9e71-0584eb417cb2.png)
