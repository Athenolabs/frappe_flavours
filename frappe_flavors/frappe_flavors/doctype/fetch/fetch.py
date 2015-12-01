# -*- coding: utf-8 -*-
# Copyright (c) 2015, MaxMorais and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model import no_value_fields
from frappe.model.document import Document

_restricted = list(no_value_fields)

class Fetch(Document):
	pass

@frappe.whitelist()
def get_links_label(dt):
	return [{'value': df.fieldname, 'label': _(df.label) or '', 'options': df.options} for df in frappe.get_meta(dt).get_link_fields()]

@frappe.whitelist()
def get_fields_label(dt, follow_childs=False, prefix='', heading='', restricted=_restricted):
	ret = []

	restricted = list(no_value_fields)
	if follow_childs:
		restricted.remove('Table')

	for df in (frappe.get_meta(dt).get('fields') or []):
		if not df.fieldtype in restricted:
			opt = {'value': '_'.join([prefix, df.fieldname]) if prefix else df.fieldname, 'label': '({}) {}'.format(heading, df.label) if heading else _(df.label) or ''}
			if prefix:
				opt['parent_field'] = prefix
			if follow_childs and df.fieldtype == 'Table':
				ret.extend(get_fields_label(df.options, False, prefix=df.fieldname, heading=df.label))
			else:
				ret.append(opt)
	return ret