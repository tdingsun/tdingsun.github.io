import json

if __name__ == "__main__":

	with open('./scraped_results.json', 'r') as j:
		dataset = json.loads(j.read())

	new_obj = {}
	for key, item in dataset.items():
		if len(dataset[key]) > 100:
			new_obj[key] = dataset[key][:100]
		else:
			new_obj[key] = dataset[key]

	json_obj = json.dumps(new_obj, indent = 4)

	with open('truncated_results.json', 'w') as f:
		f.write(json_obj)
		f.close()