#!/bin/bash
aws ecs register-task-definition --cli-input-json file://./ecs-task-definition-web.json \
| jq '.taskDefinition | .taskDefinitionArn'