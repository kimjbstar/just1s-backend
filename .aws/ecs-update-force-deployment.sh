#!/bin/bash
aws ecs update-service \
--cluster=ecs-cluster-01 \
--service=ecs-service-web \
--force-new-deployment