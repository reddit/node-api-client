#!/usr/bin/env python
from setuptools import setup, find_packages

setup(name='reddit_dfp',
    description='reddit dfp integration',
    version='0.1',
    author='reddit, inc',
    author_email='ads@reddit.com',
    packages=find_packages(),
    install_requires=[
        'r2',
    ],
    entry_points={
        'r2.plugin':
            ['dfp = reddit_dfp:Dfp']
    },
    zip_safe=False,
)