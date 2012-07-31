# -*- coding: utf-8 -*-

"""
Copyright (C) 2010 by Indifex (www.indifex.com), see AUTHORS.
License: BSD, see LICENSE for details.

For further information visit http://code.indifex.com/transifex-client
"""


<<<<<<< HEAD
VERSION = (0, 7, 0, 'final')
=======
VERSION = (0, 9, 0, 'devel')
>>>>>>> 3f4460aaedd83bb6c2f319fde59fa59d672b06af

def get_version():
    version = '%s.%s' % (VERSION[0], VERSION[1])
    if VERSION[2]:
        version = '%s.%s' % (version, VERSION[2])
    if VERSION[3] != 'final':
        version = '%s %s' % (version, VERSION[3])
    return version
