import setuptools

with open('VERSION.txt', 'r') as f:
    version = f.read().strip()

setuptools.setup(
    name="odoo14-addons-open-synergy-ssi-outsource-work",
    description="Meta package for open-synergy-ssi-outsource-work Odoo addons",
    version=version,
    install_requires=[
        'odoo14-addon-ssi_outsource_work',
        'odoo14-addon-ssi_outsource_work_rate',
    ],
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Odoo',
        'Framework :: Odoo :: 14.0',
    ]
)
