#!/bin/bash
aws ecs update-service \
--cluster=ecs-cluster-01 \
--service=ecs-service-web \
--cli-input-json file://ecs-service-web.json