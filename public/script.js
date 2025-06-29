 //  populates the dropdown with prexisting vendors
async function fetchVendorsList() {
  try {
    const res = await fetch('/get-vendors'); // fetches vendors from database
    const vendors = await res.json();

    const vendorSelect = document.getElementById('existingVendorSelect');
    vendorSelect.innerHTML = '<option value="">-- Select Existing Vendor --</option>';

    vendors.forEach(vendor => {
      // vendor should have VENCD and Vendor fields
      vendorSelect.innerHTML += `<option value="${vendor.VENCD}||${vendor.Vendor}">${vendor.Vendor} (ID: ${vendor.VENCD})</option>`;
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
  }
}

window.addEventListener('load', fetchVendorsList);// on loading page, this func is called

function onVendorSelectChange() {
  const select = document.getElementById('existingVendorSelect');
  const value = select.value;

  const vendorIdInput = document.getElementById('vendorId');
  const vendorNameInput = document.getElementById('vendorName');

  if (value) {
    // User selected existing vendor
    const [venId, venName] = value.split('||');

    vendorIdInput.value = venId;
    vendorNameInput.value = venName;

    vendorIdInput.disabled = true;
    vendorNameInput.disabled = true;
  } else {
    vendorIdInput.value = '';
    vendorNameInput.value = '';
    vendorIdInput.disabled = false;
    vendorNameInput.disabled = false;
  }
}


 function addVendor() {
  // Step 1: Collect form values
  const data = {
    vendorId: document.getElementById('vendorId').value.trim(),
    vendorName: document.getElementById('vendorName').value.trim(),
    sampleDate: document.getElementById('sampleDate').value.trim(),
    materialSpecNo: document.getElementById('materialSpecNo').value.trim(),
    materialSpecName: document.getElementById('materialSpecName').value.trim(),
    pmd: document.getElementById('pmd').value.trim(),
    indentNo: document.getElementById('indentNo').value.trim(),
    indentDate: document.getElementById('indentDate').value.trim(),
    inddev: document.getElementById('inddev').value.trim(),
    poNo: document.getElementById('poNo').value.trim(),
    poDate: document.getElementById('poDate').value.trim(),
    poVal: document.getElementById('poVal').value.trim(),
    approxVolume: document.getElementById('approxVolume').value.trim(),
    vendorsInPMD: document.getElementById('vendorsInPMD').value.trim(),
    approvalStatus: document.getElementById('approvalStatus').value.trim(),
    remark: document.getElementById('remark').value.trim()
  };

  // * fields shouldnt be empty
  if (!data.vendorId || !data.vendorName || !data.materialSpecName) {
    showMessage('Please fill all required fields: Vendor ID, Vendor Name, and Material Name.', 'danger');
    return;
  }

  // Step 3: Send data using fetch
  fetch('/add-vendor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(response => {
      showMessage(response.message, 'success'); // show success message
      clearFormAdd(); // clear form after successful add
      fetchVendorsList();
      loadMaterialDropdown();
      loadSpecificVendorDropdown();
      loadVendorDropdown() ;
      loadUpdateVendorDropdown();
      loadVendorMaterialDetails();
      loadVendorMaterials();
      
    })
    .catch(error => {
      console.error('Error:', error);
      showMessage('Server error occurred while adding vendor.', 'danger');
    });
}

function showMessage(message, type = 'success') {
  const msgDiv = document.getElementById('formMessage');
  msgDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}
function clearFormAdd() {
  const fields = [
    'vendorId', 'vendorName', 'sampleDate', 'materialSpecNo', 'materialSpecName',
    'pmd', 'indentNo', 'indentDate', 'inddev', 'poNo', 'poDate', 'poVal',
    'approxVolume', 'vendorsInPMD', 'approvalStatus', 'remark'
  ];
  
  fields.forEach(id => document.getElementById(id).value = '');
}

//-------------------------------------------------------------------------------------------------------//
//FOR DELETION
// loads prexisiting vendor list for deletion
function loadVendorDropdown() {
  fetch('/get-vendors')
    .then(res => res.json())
    .then(vendors => {
      const select = document.getElementById('deleteAllVendorSelect');
      select.innerHTML = '<option value="">-- Select Vendor --</option>';
      vendors.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.Vendor;
        opt.textContent = v.Vendor;
        select.appendChild(opt);
      });
    });
}
window.addEventListener('load', loadVendorDropdown);


function deleteAllEntries() {
  const vendor = document.getElementById('deleteAllVendorSelect').value;
  if (!vendor) return alert('Please select a vendor');
  if (!confirm(`Are you sure you want to delete ALL entries for ${vendor}?`)) return;

  fetch(`/delete-all-vendor/${vendor}`, { method: 'DELETE' })
    .then(res => res.json()    
  )
    .then(data => {
      clearFormAllDelete();
      alert(data.message);
      loadVendorDropdown();
     fetchVendorsList();
     loadSpecificVendorDropdown();
     loadMaterialDropdown();
     loadUpdateVendorDropdown();
     loadVendorMaterialDetails();
     loadVendorMaterials();
     
    })
    .catch(err => console.error(err));
}
function clearFormAllDelete() {
  const fields = [
   'deleteAllVendorSelect'
  ];
  
  fields.forEach(id => document.getElementById(id).value = '');
}

//FOR SPECIFIC ENTRIES

function loadSpecificVendorDropdown() {
  fetch('/get-vendors')
    .then(res => res.json())
    .then(vendors => {
      const select = document.getElementById('specificVendorSelect');
      select.innerHTML = '<option value="">-- Select Vendor --</option>';
      vendors.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.Vendor;
        opt.textContent = v.Vendor;
        select.appendChild(opt);
      });
    });
}
window.addEventListener('load', loadSpecificVendorDropdown);


function fetchVendorEntries() {
  const vendor = document.getElementById('specificVendorSelect').value;
  if (!vendor) return;

  // 1. Fetch all entries of the selected vendor
  fetch(`/vendor-entries/${vendor}`)
    .then(res => res.json())
    .then(data => {
      let html = `<table class="table table-bordered"><thead><tr><th>Material Spec Name</th><th>PO No</th><th>Indent No</th></tr></thead><tbody>`;
      data.forEach(row => {
        html += `<tr><td>${row['Material Specification Name']}</td><td>${row['PO No.']}</td><td>${row['Indent No']}</td></tr>`;
      });
      html += '</tbody></table>';
      document.getElementById('vendorEntriesTable').innerHTML = html;

      //  2. Now fetch materials only after entries are loaded
      return fetch(`/materials-for-vendor/${vendor}`);
    })
    .then(res => res.json())
    .then(materials => {
      const materialSelect = document.getElementById('materialToDelete');
      materialSelect.innerHTML = '<option value="">-- Select Material Specification --</option>';
      materials.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m['Material Specification Name'];
        opt.textContent = m['Material Specification Name'];
        materialSelect.appendChild(opt);
      });
    })
    .catch(err => console.error('❌ Error loading entries or materials:', err));
}


function deleteSpecificEntry() {
  const vendor = document.getElementById('specificVendorSelect').value;
  const materialName = document.getElementById('materialToDelete').value.trim();
  if (!vendor || !materialName) return alert('Please select vendor and enter material name');

  fetch('/delete-entry', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vendorName: vendor, materialName })
  })
    .then(res => res.json())
    .then(data => {
      clearFormSpDelete();
      alert(data.message);
     loadSpecificVendorDropdown();
     fetchVendorsList();
     loadVendorDropdown();
      fetchVendorEntries(); // refresh table
      loadMaterialDropdown();
      loadUpdateVendorDropdown();
      loadVendorMaterialDetails();
      loadVendorMaterials();
    })
    .catch(err => console.error(err));
}

function clearFormSpDelete() {
  const fields = [
   'specificVendorSelect','materialToDelete'
  ];
  
  fields.forEach(id => document.getElementById(id).value = '');
  document.getElementById('vendorEntriesTable').innerHTML = '';

}

//--------------------------------------------------------------------------------

function loadMaterialDropdown() {
  console.log("loadmaterial called");
  fetch('/get-material-names')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(materials => {
      console.log("📦 Materials received:", materials);
      const dropdown = document.getElementById('searchMaterialDropdown');
      dropdown.innerHTML = '<option value="">-- Select Material Specification --</option>';
      materials.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m['Material Specification Name'];
        opt.textContent = m['Material Specification Name'];
        dropdown.appendChild(opt);
      });
    })
    .catch(err => {
      console.error("❌ Error loading materials:", err);
    });
}
window.addEventListener('load', loadMaterialDropdown);

// On button click, fetch vendors for selected material
function searchMaterial() {
  const selectedMaterial = document.getElementById('searchMaterialDropdown').value;
  if (!selectedMaterial) {
    alert('Please select a material');
    return;
  }
console.log("🔎 Fetching vendors for material:", selectedMaterial);
  fetch(`/vendors-by-material/${encodeURIComponent(selectedMaterial)}`)
    .then(res => res.json())
    .then(vendors => {
      const container = document.getElementById('materialVendorResults');
      if (vendors.length === 0) {
        container.innerHTML = '<p>No vendors found for this material.</p>';
        return;
      }

      const headings = [
      "Sample Submission Date",
      "Material Specification Number",
      "PMD",
      "Approx Business Volume per annum in Rs.Lacs(As on 18.12.2024)",
      "Vendor already in PMD(1V/2V/3V)",
      "Vendor development/Approval Status",
      "Remark"
    ];

let html = '<table class="table table-bordered">';
html += '<thead><tr><th>Vendor</th>';  // First column is vendor name

headings.forEach(h => {
  html += `<th>${h}</th>`;
});
html += '</tr></thead><tbody>';

vendors.forEach(row => {
  html += `<tr><td>${row.Vendor}</td>`; // Row header = vendor name
  headings.forEach(h => {
    html += `<td>${row[h] || ''}</td>`;
  });
  html += '</tr>';
});

html += '</tbody></table>';
container.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching vendor info:', error);
      document.getElementById('materialVendorResults').innerHTML = '<p>Something went wrong while fetching vendor data.</p>';
    });
}

//UPDATE VENDOR DETAILS//
// Load all vendor names into the "updateVendorSelect" dropdown on page load
function loadUpdateVendorDropdown() {
  console.log("Loading vendors…");
  fetch('/get-vendors')
    .then(res => res.json())
    .then(vendors => {
      
  
      const select = document.getElementById('updateVendorSelect');
      select.innerHTML = '<option value="">-- Select Vendor --</option>';
      vendors.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.Vendor;  // We only need Vendor name
        opt.textContent = v.Vendor;
        select.appendChild(opt);
      });
    });
}

// Correct way to bind this after page load
window.addEventListener('load', loadUpdateVendorDropdown);

// Load materials associated with selected vendor
function loadVendorMaterials() {
  console.log("loadVendorMaterials called");
  const vendor = document.getElementById('updateVendorSelect').value;
  if (!vendor) return;

  fetch(`/get-materials-by-vendor?vendor=${encodeURIComponent(vendor)}`)
    .then(res => res.json())
    .then(materials => {
      console.log("Materials received:", materials);
      const select = document.getElementById('updateMaterialSelect');
      select.innerHTML = '<option value="">-- Select Material --</option>';
      materials.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m['Material Specification Name'];
        opt.textContent = m['Material Specification Name'];
        select.appendChild(opt);
      });
    });
}

// Load all editable fields of the selected material for that vendor
function loadVendorMaterialDetails() {
  const vendor = document.getElementById('updateVendorSelect').value;
  const material = document.getElementById('updateMaterialSelect').value;

  if (!vendor || !material) return;

  fetch(`/get-vendor-material-details?vendor=${encodeURIComponent(vendor)}&material=${encodeURIComponent(material)}`)
    .then(res => res.json())
    .then(data => {
      
  
console.log("All keys in server response:", Object.keys(data));
    
      // Populate input fields with fetched data
       document.getElementById('updateMaterialSpecName').value = data['Material Specification Name'] || '';
      document.getElementById('updateVendorName').value = data['Vendor'] || '';
      document.getElementById('updateVendorId').value = data['VENCD'] || '';
      document.getElementById('updateSampleDate').value = data['Sample Submission Date'] || '';
      document.getElementById('updateMaterialSpecNumber').value = data['Material Specification Number'] || '';
      document.getElementById('updatePMD').value = data['PMD'] || '';
      document.getElementById('updateIndentNo').value = data['Indent No'] || '';
      document.getElementById('updateIndentDate').value = data['Indent Date'] || '';
      document.getElementById('updateINDDEV').value = data['INDDEV'] || '';
      document.getElementById('updatePONo').value = data['PO No.'] || '';
      document.getElementById('updatePODate').value = data['PO Date'] || '';
      document.getElementById('updatePOVal').value = data['PO-VAL(Rs.Lacs)'] || '';
      document.getElementById('updateBusinessVolume').value = data['Approx Business Volume per annum in Rs.Lacs(As on 18.12.2024)'] || '';
      document.getElementById('updateVendorsInPMD').value = data['Vendor already in PMD(1V/2V/3V)'] || '';
      document.getElementById('updateApprovalStatus').value = data['Vendor development/Approval Status'] || '';
      document.getElementById('updateRemark').value = data['Remark'] || '';
    })
    .catch(err => {
      console.error('Error loading vendor material details:', err);
      alert('Could not load vendor details for the selected material.');
    });
}

// Submit updated form data to server
function submitVendorUpdate() {
  const vendor = document.getElementById('updateVendorSelect').value;
  const material = document.getElementById('updateMaterialSelect').value;

  if (!vendor || !material) {
    alert("Please select both vendor and material.");
    return;
  }

  const data = {
    vendor,
    material,
    VendorId:document.getElementById('updateVendorId').value,
    sampleDate: document.getElementById('updateSampleDate').value,
    materialSpecNumber: document.getElementById('updateMaterialSpecNumber').value,
    pmd: document.getElementById('updatePMD').value,
    indentNo: document.getElementById('updateIndentNo').value,
    indentDate: document.getElementById('updateIndentDate').value,
    inddev: document.getElementById('updateINDDEV').value,
    poNo: document.getElementById('updatePONo').value,
    poDate: document.getElementById('updatePODate').value,
    poVal: document.getElementById('updatePOVal').value,
    businessVolume: document.getElementById('updateBusinessVolume').value,
    vendorsInPMD: document.getElementById('updateVendorsInPMD').value,
    approvalStatus: document.getElementById('updateApprovalStatus').value,
    remark: document.getElementById('updateRemark').value
  };

  fetch('/update-vendor-details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      loadMaterialDropdown();
      loadSpecificVendorDropdown();
      loadUpdateVendorDropdown();
      loadVendorDropdown();
      loadVendorMaterialDetails();
      loadVendorMaterials();
      fetchVendorEntries();
      fetchVendorsList();
    })
    .catch(err => {
      alert('Error updating vendor info');
      console.error(err);
    });
}
