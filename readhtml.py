#import urllib2
import urllib.request as urllib2
from bs4 import BeautifulSoup

response = urllib2.urlopen('http://localhost/SocialNetwork/ss.html')
html_doc = response.read()
soup = BeautifulSoup(html_doc, 'html.parser')

for x in soup.find_all(class_='dropdown-item'): print(x.get_text())