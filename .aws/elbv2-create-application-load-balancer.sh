#!/bin/bash
aws elbv2 create-load-balancer \
  --name application-load-balancer-01 \
  --type application
  --scheme internal
  --subnets subnet-1ba86170 subnet-db615c97 subnet-ddcc76a6 \
  --security-groups sg-0fc3538118f725b16 sg-5fd8d73c \
  | jq '.LoadBalancers[0] | .LoadBalancerArn'