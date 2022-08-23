import pandas as pd

data = pd.read_csv('./server/earthquakes_gt_3.tsv', sep='\t', header=0)

print(data.head())

data.to_json('./server/eq_gt_3.json')