import sys
import json
import ast

data_to_pass_back = "send this to node process"

input = sys.argv[1]
output = data_to_pass_back
print(output)

sys.stdout.flush()
