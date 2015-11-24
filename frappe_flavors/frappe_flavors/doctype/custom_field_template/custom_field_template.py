# -*- coding: utf-8 -*-
# Copyright (c) 2015, MaxMorais and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.utils import cstr
from frappe import _

from frappe.model.document import Document

class CustomFieldTemplate(Document):
	
	def autoname(self):
		self.set_fieldname()
		self.name = "{}-{}".format(self.module, self.fieldname)

	def validate(self):
		self.validate_table_has_rows('positions')

	def set_fieldname(self):
		if not self.fieldname:
			if not self.label:
				frappe.throw(_("Label is Mandatory"))
			# remove special characters from fieldname
			self.fieldname = filter(lambda x: x.isdigit() or x.isalpha() or '_', 
				cstr(self.label).lower().replace(' ', '_'))

	def on_update(self):
		self.create_custom_fields()

	def create_custom_fields(self):
		template = self.as_dict()
		for d in self.positions:
			cf = d.as_dict()
			cf.update(template)
			for f in ['doctype', 'name']:
				cf.pop(f)
			cf.update({
				'doctype': "Custom Field",
				'fieldname': make_fieldname(d.dt, self.fieldname) 
			})

			ref = create_or_update_custom_field(d.dt, cf)
			frappe.db.set_value("Custom Field Template Position", d.name, "fieldname", cf["fieldname"])
			frappe.db.set_value("Custom Field Template Position", d.name, "custom_field", ref)


def make_fieldname(dt, fieldname):
	return filter(lambda x: x.isdigit() or x.isalpha() or '_',
		cstr(' '.join([dt, fieldname])).lower().replace(' ', '_'))


@frappe.whitelist()
def get_fields_label(doctype=None):
	return [{'value': df.fieldname or '', 'label': _(df.label) or ''} for df in frappe.get_meta(doctype).get('fields')]

def create_or_update_custom_field(doctype, df):
	cf = frappe.db.get_value("Custom Field", {"dt": doctype, "fieldname": df.fieldname})
	if not cf:
		doc = frappe.new_doc("Custom Field")
	else:
		doc = frappe.get_doc("Custom Field", cf["name"])
	
	doc.update(df)
	doc.save()
	return doc.name