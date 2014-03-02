# -*- coding: utf-8 -*-
"""
Created on Tue Dec 24 00:56:00 2013

@author: zlx
"""

from twisted.web.static import File
from twisted.web.resource import Resource
    
resource = Resource()
resource.putChild('js', File('./mobile/js'))