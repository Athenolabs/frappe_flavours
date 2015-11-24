# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "frappe_flavors"
app_title = "Frappe Flavors"
app_publisher = "MaxMorais"
app_description = "Awesome Flavors for Frappe Developers"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "max.morais.dmm@gmail.com"
app_version = "0.0.1"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/frappe_flavors/css/frappe_flavors.css"
# app_include_js = "/assets/frappe_flavors/js/frappe_flavors.js"

# include js, css files in header of web template
# web_include_css = "/assets/frappe_flavors/css/frappe_flavors.css"
# web_include_js = "/assets/frappe_flavors/js/frappe_flavors.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "frappe_flavors.install.before_install"
# after_install = "frappe_flavors.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "frappe_flavors.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"frappe_flavors.tasks.all"
# 	],
# 	"daily": [
# 		"frappe_flavors.tasks.daily"
# 	],
# 	"hourly": [
# 		"frappe_flavors.tasks.hourly"
# 	],
# 	"weekly": [
# 		"frappe_flavors.tasks.weekly"
# 	]
# 	"monthly": [
# 		"frappe_flavors.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "frappe_flavors.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "frappe_flavors.event.get_events"
# }

