copy /Y tryme.py tryme.rpy
copy /Y static.py static.rpy
python twistd.py web --path=. --ignore-ext=py --index mobile/index.html --port 80