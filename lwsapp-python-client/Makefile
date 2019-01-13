install: venv/bin/activate
venv/bin/activate: requirements.txt
	test -d venv || python3 -m venv venv
	venv/bin/pip install -r requirements.txt
	venv/bin/pip install -e .
	touch venv/bin/activate
