#!/bin/bash
aws ecs list-task-definitions \
| jq '.taskDefinitionArns' \
| jq 'reverse' \
| jq '.[0]'