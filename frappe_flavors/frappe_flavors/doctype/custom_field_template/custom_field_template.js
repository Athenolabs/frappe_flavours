cur_frm.cscript.has_special_chars = function(t) {
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    for (var i = 0; i < t.length; i++) {
        if (iChars.indexOf(t.charAt(i)) != -1) {
            return true;
        }
    }
    return false;
}

cur_frm.cscript.setup_dt = function(frm, cdt, cdn){
    var dt = frappe.utils.filter_dict(cur_frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].docfields, {'fieldname': 'dt'})[0];

    dt.get_query = function(doc, cdt, cdn){
        filters = [
            ['DocType', 'issingle', '=', 0]
        ]
        if (user!=='Administrator'){
            filters.push(['DocType', 'module', '!=', 'Core'])
        }

        return filters;
    }

    dt.hidden = frm.doc.__islocal;
    dt.reqd = !frm.doc.__islocal;
    cur_frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].fields_dict.dt.refresh();
}

frappe.ui.form.on("Custom Field Template", "label", function(frm, cdt, cdn){
    if(frm.doc.label && frm.cscript.has_special_chars(frm.doc.label)){
        frm.fields_dict['label_help'].disp_area.innerHTML = '<font color = "red">Special Characters are not allowed</font>';
        frm.doc.label = '';
        refresh_field('label');
    }
    else
        frm.fields_dict['label_help'].disp_area.innerHTML = '';
});

frappe.ui.form.on("Custom Field Template", "fieldtype", function(frm, cdt, cdn){
        if(frm.doc.fieldtype == 'Link') {
        frm.fields_dict['options_help'].disp_area.innerHTML =
          __('Name of the Document Type (DocType) you want this field to be linked to. e.g. Customer');
    } else if(frm.doc.fieldtype == 'Select') {
        frm.fields_dict['options_help'].disp_area.innerHTML =
            __('Options for select. Each option on a new line.')+' '+__('e.g.:')+'<br>'+__('Option 1')+'<br>'+__('Option 2')+'<br>'+__('Option 3')+'<br>';
    } else if(frm.doc.fieldtype == 'Dynamic Link') {
        frm.fields_dict['options_help'].disp_area.innerHTML =
            __('Fieldname which will be the DocType for this link field.');
    } else {
        frm.fields_dict['options_help'].disp_area.innerHTML = '';
    }
});

frappe.ui.form.on("Custom Field Template Position", "form_render", function(frm, cdt, cdn){
    var field = frappe.utils.filter_dict(frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].docfields, {'fieldname': 'dt'})[0];
    field.read_only = !frm.doc.__islocal;
    frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].fields_dict.dt.refresh();
});

frappe.ui.form.on("Custom Field Template Position", "dt", function(frm, cdt, cdn){
    var d = locals[cdt][cdn];

    if (!d.dt){
        frappe.model.set_value(cdt, cdn, 'insert_after', '');
    }

    var insert_after = frm.doc.insert_after || null;
    return frappe.call({
        'method': 'frappe_flavors.frappe_flavors.doctype.custom_field_template.custom_field_template.get_fields_label',
        'args': {'doctype': d.dt},
        'callback': function(r, rt){
            var field = frappe.utils.filter_dict(frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].docfields, {'fieldname': 'insert_after'})[0];
            field.options = r.message;
            var fieldnames = $.map(r.message, function(v) { return v.value; });

            if (insert_after == null || !in_list(fieldnames, insert_after)){
                insert_after = fieldnames[-1];
            }

            frappe.model.set_value(cdt, cdn, 'insert_after', insert_after);

            frm.fields_dict.positions.grid.grid_rows_by_docname[cdn].fields_dict.insert_after.refresh();
        }
    });
});