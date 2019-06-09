import json
from datetime import datetime
import urllib.request

devicesJSON = "https://raw.githubusercontent.com/KrakenProject/official_devices/master/devices.json"
baseSITE = "https://krakenproject.github.io/"
date = datetime.now().strftime("%Y-%m-%d")

xml = '<?xml version="1.0" encoding="UTF-8"?>'
xml += '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
xml += "\n<url><loc>" + baseSITE + "</loc><lastmod>"+date+"</lastmod><priority>1.00</priority></url>"

request = urllib.request.urlopen(devicesJSON)
devices = json.loads(request.read())

for device in devices:
	xml += "\n<url><loc>" + baseSITE + '?device=' + device['codename'] +"</loc><lastmod>"+date+"</lastmod><priority>0.85</priority></url>"

xml += "\n</urlset>"

file = open('sitemap.xml', 'w')
file.write(xml)

print("SITEMAP GERENATED -> sitemap.xml")