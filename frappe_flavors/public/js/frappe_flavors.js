frappe.ui.form.on("Fetch", "form_render", function(frm, cdt, cdn){
    if (!frm.cscript.parents){
        frm.cscript.parents = {};
    }
    frappe.call({
        'method': 'frappe_flavors.frappe_flavors.doctype.fetch.fetch.get_links_label',
        'args': {
            'dt': frm.doc.dt
        },
        'callback': function(res){
            var links = frappe.utils.filter_dict(frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].docfields,
                {'fieldname': 'link_field'})[0];
            links.options = res.message;
            frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].fields_dict.link_field.refresh();
            frm.cscript.link_references = {};
            res.message.forEach(function(r){
                frm.cscript.link_references[r.value] = r.options;
            });
        }
    });

    frappe.call({
        'method': 'frappe_flavors.frappe_flavors.doctype.fetch.fetch.get_fields_label',
        'args': {
            'dt': frm.doc.dt,
            'follow_childs': true
        },
        'callback': function(res){
            var targets = frappe.utils.filter_dict(frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].docfields,
                {'fieldname': 'target_field'})[0];
            targets.options = res.message;
            frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].fields_dict.target_field.refresh();
            res.message.forEach(function(r){
                if (r.parent_field){
                    frm.cscript.parents[r.value] = r.parent_field;
                }
            });
        }
    });

});

frappe.ui.form.on("Fetch", "link_field", function(frm, cdt, cdn){
    var d = locals[cdt][cdn];
    frappe.call({
        'method': 'frappe_flavors.frappe_flavors.doctype.fetch.fetch.get_fields_label',
        'args': {
            'dt': cur_frm.cscript.link_references[d.link_field],
            'follow_childs': true
        },
        'callback': function(res){
            var links = frappe.utils.filter_dict(frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].docfields,
                {'fieldname': 'lookup_field'})[0];
            links.options = res.message;
            frm.fields_dict.fetch.grid.grid_rows_by_docname[cdn].fields_dict.lookup_field.refresh();
        }
    });
});

frappe.ui.form.on("Fetch", "target_field", function(frm, cdt, cdn){
    var d = locals[cdt][cdn];
    frappe.model.set_value(cdt, cdn, "field_parent", frm.cscript.parents.hasOwnProperty(d.target_field)? frm.cscript.parents[d.target_field] : '');
});