import csv
import json
import pprint
import sys

csv_rows = []
with open('nonnationals.csv', 'r' ) as csvfile:
    reader = csv.DictReader(csvfile)
    title = reader.fieldnames
    for row in reader:
        csv_rows.extend([{title[i]:row[title[i]] for i in range(len(title))}])
    country_data = {'points': None}
    country_data['points'] = csv_rows

with open('country.json', 'w') as fp:
    json.dump(country_data, fp)
