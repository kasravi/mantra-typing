import pandas as pd
import json

# Read the CSV file into a pandas DataFrame
df = pd.read_csv('Ratings_Warriner_et_al.csv')

# Select the desired columns and rename them
selected_columns = df[['Word', 'V.Mean.Sum', 'A.Mean.Sum']]
selected_columns = selected_columns.rename(columns={'Word': 'w', 'V.Mean.Sum': 'v', 'A.Mean.Sum': 'a'})

# Normalize the columns 'v' and 'a' between 0 and 1
selected_columns['v'] = (selected_columns['v'] - selected_columns['v'].min()) / (selected_columns['v'].max() - selected_columns['v'].min())
selected_columns['a'] = (selected_columns['a'] - selected_columns['a'].min()) / (selected_columns['a'].max() - selected_columns['a'].min())

# Convert the selected columns to JSON
json_data = selected_columns.to_json(orient='records')

# Save the JSON data to a file
with open('output.json', 'w') as json_file:
    json_file.write(json_data)

print("JSON file has been created successfully.")
