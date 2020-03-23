#!/bin/bash
aws ecs create-service --cluster=ecs-cluster-01 \
--cli-input-json file://ecs-service-web.json