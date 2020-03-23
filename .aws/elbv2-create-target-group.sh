#!/bin/bash
aws elbv2 create-target-group \
  --name application-target-group-01 \
  --protocol HTTP --port 80 --vpc-id vpc-724b9719 \
  | jq '.TargetGroups[0] | .TargetGroupArn'