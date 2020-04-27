#!/bin/bash
aws ec2 run-instances --image-id ami-062022418ff822030 \
--count 1 \
--instance-type t2.small \
--security-group-ids sg-5fd8d73c sg-0fc3538118f725b16 \
--subnet-id subnet-1ba86170 \
--iam-instance-profile Name=ecs-instance \
--user-data file://ec2-userdata.sh \
--key-name just1s-backend \
--associate-public-ip-address