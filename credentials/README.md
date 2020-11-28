# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP :  http://ec2-13-52-247-220.us-west-1.compute.amazonaws.com/ (Public IPv4 address: 13.52.247.220) 
2. SSH username : ubuntu
3. SSH password or key : Team02.pem
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used: mydb.cxfxbt23l5bi.us-west-1.rds.amazonaws.com Port: 3306
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username: root
6. Database password: CSC648TEAM02!
7. Database name (basically the name that contains all your tables): DoReMeet
8. Instructions on how to use the above information.

a.) **SSH into the EC2 instance:**<br>
$ ssh -i "Team02.pem" ubuntu@ec2-13-52-247-220.us-west-1.compute.amazonaws.com (locate the .pem file before doing this).<br>

b.) **Connect to database using MySQLWorkbench** <br>
Create a new connection over Standard TCP/IP over SSH<br>
SSH Hostname: ec2-13-52-247-220.us-west-1.compute.amazonaws.com<br>
SSH Username: ubuntu<br>
SSH Key File: path to Team02.pem file<br>
MySQL Hostname: mydb.cxfxbt23l5bi.us-west-1.rds.amazonaws.com<br>
MySQL Server Port: 3306<br>
Username: root<br>
Password: CSC648TEAM02!<br>
Default Schema: **leave blank**


# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
