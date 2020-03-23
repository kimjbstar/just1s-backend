#!/bin/bash
aws elbv2 create-listener \
--protocol HTTP --port 80 \
--load-balancer-arn='arn:aws:elasticloadbalancing:ap-northeast-2:963498106571:loadbalancer/app/load-balancer-01/6c894a49c8b1c215' \
--default-actions 'Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:ap-northeast-2:963498106571:targetgroup/target-group-01/780ec62e3620ea2e'