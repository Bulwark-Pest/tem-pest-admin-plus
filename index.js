const form = {};
const toast = {};
const floatingQuantityTrees = { value: 31 };
const bushCount = { value: 31 };
const minMonths = { value: 3 };
const maxMonths = { value: 23 };
const customerData = {};
const servicePlanForm = {};
const formSqFeet = {};
const sessionStore = {};
const MOSQUITO = 1;
const LAWN_WEED = 1;
const TERMITE_CONTROL = 1;
const TERMITE = 1;
const TDEBUG = true;
const minIsPrice = {};
const servicePlanModal = () => ({ _hideModal: () => {} });
const generateID = () => {};
const setWordsOnTechNotes = () => {};
const deleteWordsOnTechNotes = () => {};
const setTechNotesOnFloatingFleasTicks = () => {};
const removeTechNotesOnFloatingFleasTicks = () => {};
const addonsServicePlansType = {};
const alterSPlan = {
  value: []
};

function saveServicePlan() {
  if (form.servicePlanId == 136 && floatingQuantityTrees.value == 31 && bushCount.value < 1) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'The quantity must be greater than zero!',
    });
    return false;
  }
  const setAgreementLengthId = (servicePlan) => {
    if (servicePlan.serviceFrequencyId == 1 && servicePlan.servicePlanId == 96) {
      //RC control with OTT
      form.agreementLengthId = 2;
    } else if (servicePlan.servicePlanId == 130) {
      //JORO Plan
      form.agreementLengthId = 1;
    } else if (servicePlan.mainPlan && servicePlan.typeOfService != MOSQUITO) {
      const selectedServicePlan = customerData.servicePlanListSelect.find((item) => item.id == form.servicePlanId);
      const code = selectedServicePlan.code;
      form.agreementLengthId = codesAndSelect[code] || 12;
    }
  };
  const servicePlanId = document.getElementById('servicePlanId').value || 0;
  const floatingTypeOfServiceSelect = document.getElementById('floatingTypeOfServiceSelect');
  const selectOptionsTextTypeOfService =
    floatingTypeOfServiceSelect.options[floatingTypeOfServiceSelect.selectedIndex].text;
  const selectOptionsTextTypeOfServiceValue =
    floatingTypeOfServiceSelect.options[floatingTypeOfServiceSelect.selectedIndex].value;

  let radioCheckChargeFrequency;
  let radioCheckChargeFrequencyValue;
  let radioCheckServiceFrequencyValue;

  if (selectOptionsTextTypeOfServiceValue == 0) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please select a Service Category!',
    });
    return false;
  }
  let sqFeetTotal = document.getElementById('sqFeetTotalId').value || 0;
  if (
    selectOptionsTextTypeOfServiceValue == LAWN_WEED &&
    sqFeetTotal < 1 &&
    servicePlanId != '136' &&
    servicePlanId != '135'
  ) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please, indicate the Square Feet!',
    });
    return false;
  }
  if (
    servicePlanForm.grassType == 0 &&
    ['16', '21', '23'].includes(form.officeId) &&
    ['87', '88'].includes(servicePlanId) &&
    selectOptionsTextTypeOfServiceValue == LAWN_WEED
  ) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please, indicate the Grass Type!',
    });
    return false;
  }

  const beesHasDNone = document.querySelector('#carpenterBees').classList.contains('d-none');
  if (!beesHasDNone && servicePlanForm.carpentersBees === '-1') {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please select an answer for Treatment of carpenter bees!',
    });
    return false;
  }
  const fleasTicksHasDNone = document.querySelector('#fleasTicks').classList.contains('d-none');
  if (!fleasTicksHasDNone && servicePlanForm.fleasTicks === '-1') {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please select an answer for Where will we be treating fleas (ticks)!',
    });
    return false;
  }
  const termiteLinearFeetHasDNone = document.querySelector('#termiteLinearFeet').classList.contains('d-none');
  if (
    !termiteLinearFeetHasDNone &&
    (servicePlanForm.termiteLinearFeet == '0' || servicePlanForm.termiteLinearFeet === '')
  ) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'Please, indicate a Linear Feet!',
    });
    return false;
  }
  const floatingServicePlanSelect = document.getElementById('floatingServicePlanSelect');
  const selectOptionsServicePlan = floatingServicePlanSelect.options[floatingServicePlanSelect.selectedIndex].text;
  const selectOptionsServicePlanValue =
    floatingServicePlanSelect.options[floatingServicePlanSelect.selectedIndex].value;
  const selectOptionsServicePlanCode =
    floatingServicePlanSelect.options[floatingServicePlanSelect.selectedIndex].getAttribute('data-code');
  const monthServicesPlan = customerData.selectedMonths;
  let monthsCount = monthServicesPlan.length;
  TDEBUG && console.log('monthServicesPlan');
  console.log(monthServicesPlan);

  // 2 => 60 days
  // 30 => 30 days
  // any option => 12
  const codesAndSelect = {
    OTT: 2,
    FLEA: 2,
    TICK: 2,
    BEES: 30,
  };
  // Month validations
  const planRequirements = [
    { code: '5TP', months: 5 },
    { code: '7TP', months: 7 },
    { code: 'EOM', months: 6 },
    { code: 'MO', months: 12 },
    { code: 'QT', months: 4 },
    { code: 'WCPEA', months: 2 },
    { code: 'WCOTT', months: 1 },
  ];
  if (selectOptionsServicePlanCode == 'WCPE') {
    minMonths.value = 2;
    maxMonths.value = 2;
  }
  const selectedPlan = planRequirements.filter((plan) => plan.code === selectOptionsServicePlanCode);
  maxMonths.value = selectedPlan.length > 0 ? selectedPlan[0].months : 12;
  // Bypass to termine control minMonths
  if (minMonths.value != 0 && monthsCount < minMonths.value && selectOptionsTextTypeOfServiceValue != TERMITE_CONTROL) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: `This plan requires ${minMonths.value} months selected, please check your plan!`,
    });
    return false;
  }
  if (monthsCount > maxMonths.value && selectOptionsTextTypeOfServiceValue != TERMITE_CONTROL) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: `This plan must have ${maxMonths.value} months selected, please check your plan!`,
    });
    return false;
  }

  if (
    selectOptionsTextTypeOfServiceValue == TERMITE_CONTROL &&
    servicePlanForm.customerStatusNoOption == 1 &&
    (selectOptionsServicePlanValue == 30 || selectOptionsServicePlanValue == 81)
  ) {
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'We do not offer WDORs for non-existing customers in this office!',
    });
    return false;
  }
  const selectOptionsTextServicePlanSelect =
    floatingServicePlanSelect.options[floatingServicePlanSelect.selectedIndex].text;
  const localStorageCheck = sessionStore.$state.servicePlanList ?? [];
  const servicePlans = localStorageCheck.map((item) => item.servicePlan);

  let matchFound = false;
  servicePlans.forEach((item) => {
    if (item === selectOptionsTextServicePlanSelect && selectOptionsTextServicePlanSelect !== 'Other Service') {
      matchFound = true;
      return;
    }
  });

  if (matchFound && servicePlanId == 0) {
    // Add a new plan
    // there is a services plan
    toast.fire({
      icon: 'error',
      titleText: 'Oops...',
      html: 'This service plan is already in use, please check your service plan list!',
    });
    return false;
  } else {
    // Edit the plan
    try {
      radioCheckChargeFrequency = document.querySelector('input[name="radioCheckChargeFrequency"]:checked')?.text || '';
      radioCheckChargeFrequencyValue =
        document.querySelector('input[name="radioCheckChargeFrequency"]:checked')?.value || '';
      radioCheckServiceFrequencyValue =
        document.querySelector('input[name="radioCheckServiceFrequency"]:checked')?.value || '';
    } catch (e) {
      radioCheckChargeFrequency = 'chargeFrequency';
      radioCheckChargeFrequencyValue = 0;
      radioCheckServiceFrequencyValue = '';
    }
    const priceZone = document.getElementById('priceZone').value;
    const monthServicesPlan = selectOptionsTextTypeOfServiceValue === TERMITE ? [] : customerData.selectedMonths;

    const isPrice = servicePlanForm.isPrice;
    const isPriceTotal = servicePlanForm.isPriceTotal;
    const isPricePercentage = servicePlanForm.isPricePercentage;
    const servicePrice = servicePlanForm.servicePrice;
    const servicePricePercentage = servicePlanForm.servicePricePercentage;
    const servicePriceTotal = servicePlanForm.servicePriceTotal;
    const treatmentType = document.getElementById('floatingtreatmentType').value;

    if (servicePlanId == 0) {
      // Add a new record
      let randomId = generateID({ prefix: 'id-' });
      let servicePlanItems = [];

      if (sessionStore.$state.servicePlanList) {
        servicePlanItems = sessionStore.$state.servicePlanList;
      }
      const existingMainPlan = servicePlanItems.find((item) => item.mainPlan === true);
      const meServicePlan = {};
      meServicePlan.id = randomId;

      if (existingMainPlan !== undefined) {
        meServicePlan.mainPlan = false;
        meServicePlan.planType = 2;
      } else {
        meServicePlan.mainPlan = true;
        meServicePlan.planType = 1;
      }
      if (meServicePlan.mainPlan) {
        form.paymentTypeId = '6';
      }

      meServicePlan.typeOfServiceId = selectOptionsServicePlanValue;
      meServicePlan.typeOfService = selectOptionsTextTypeOfServiceValue;
      meServicePlan.servicePlanId = selectOptionsServicePlanValue;
      meServicePlan.servicePlan = selectOptionsServicePlan;
      meServicePlan.servicePlanCode = selectOptionsServicePlanCode;
      meServicePlan.chargeFrequencyId = radioCheckChargeFrequencyValue;
      meServicePlan.chargeFrequency = radioCheckChargeFrequency;
      meServicePlan.serviceFrequencyId = radioCheckServiceFrequencyValue;
      meServicePlan.priceZone = priceZone;
      meServicePlan.monthServicesPlan = monthServicesPlan;
      meServicePlan.isPrice = isPrice;
      meServicePlan.isPricePercentage = isPricePercentage;
      meServicePlan.isPriceTotal = isPriceTotal;
      meServicePlan.servicePrice = servicePrice;
      meServicePlan.servicePricePercentage = servicePricePercentage;
      meServicePlan.servicePriceTotal = servicePriceTotal;
      meServicePlan.treatmentTypeId = treatmentType;
      meServicePlan.lengthOfAgreement = 0;
      meServicePlan.closeDate = '';
      meServicePlan.minMonths = minMonths.value ?? 1;
      meServicePlan.maxMonths = maxMonths.value ?? 12;
      meServicePlan.minMonthQuantity = minMonths.value ?? 1;
      meServicePlan.maxMonthQuantity = maxMonths.value ?? 12;
      meServicePlan.RetentionMinimum = minIsPrice.value;
      meServicePlan.season = servicePlanForm.season;
      meServicePlan.grassType = servicePlanForm.grassType;
      meServicePlan.overseed = servicePlanForm.overseed;
      meServicePlan.serviceNeeded = servicePlanForm.serviceNeeded;
      meServicePlan.sqfeetOne = formSqFeet.sqfeetOne;
      meServicePlan.sqfeetTwo = formSqFeet.sqfeetTwo;
      meServicePlan.sqfeetThree = formSqFeet.sqfeetThree;
      meServicePlan.sqfeetTotal = formSqFeet.sqfeetTotal || 0;
      meServicePlan.isEditable = true;
      meServicePlan.isRemovable = !meServicePlan.mainPlan;
      meServicePlan.termiteActivity = servicePlanForm.termiteActivity;
      meServicePlan.termiteStructure = servicePlanForm.termiteStructure;
      meServicePlan.termiteStructureAdditional = servicePlanForm.termiteStructureAdditional;
      meServicePlan.termiteLinearFeet = servicePlanForm.termiteLinearFeet;
      meServicePlan.baitStationsTotal = servicePlanForm.baitStationsTotal;
      meServicePlan.baitStations1 = servicePlanForm.baitStations1;
      meServicePlan.baitStations2 = servicePlanForm.baitStations2;
      meServicePlan.GeofenceIsPrice = servicePlanForm.GeofenceIsPrice;
      meServicePlan.GeofenceServicePrice = servicePlanForm.GeofenceServicePrice;
      meServicePlan.TargetCharge = servicePlanForm.TargetCharge;
      meServicePlan.installDuration = servicePlanForm.installDuration;
      if (
        selectOptionsServicePlanValue === '1' ||
        selectOptionsServicePlanValue === '2' ||
        selectOptionsServicePlanValue === '98' ||
        selectOptionsServicePlanValue === '100'
      ) {
        setTechNotesOnFloatingFleasTicks();
      }
      if (servicePlanForm.grassType == 15) {
        setWordsOnTechNotes('Service Pro: Please identify grass type and inform Support Center to update account');
      }
      if (selectOptionsServicePlanValue === '101') {
        setWordsOnTechNotes(
          'Please inspect the premises and provide the proposal and termite inspection agreement to the customer prior to installing bait stations. Total Bait stations needed: ' +
            servicePlanForm.baitStationsTotal,
        );
      }
      if (servicePlanForm.termiteActivity == true) {
        setWordsOnTechNotes('Customer has indicated that they have termite activity');
      }
      if (selectOptionsTextTypeOfServiceValue === TERMITE || selectOptionsTextTypeOfServiceValue === TERMITE_CONTROL) {
        const closeDateGet = document.querySelector('#closeDate .p-inputtext');
        const closeDateValue = closeDateGet.value;

        meServicePlan.lengthOfAgreement = servicePlanForm.warrantyExtension;
        meServicePlan.closeDateValue = closeDateValue;
      }
      servicePlanItems.push(meServicePlan);
      if (
        meServicePlan.typeOfService == LAWN_WEED ||
        meServicePlan.typeOfService == MOSQUITO ||
        meServicePlan.typeOfService == TERMITE_CONTROL
      ) {
        alterSPlan.value.forEach((item) => {
          const alterServicePlan = {
            ...meServicePlan,
            monthServicesPlan: item.addOnMonths,
            servicePlanId: item.addOnPlanId,
            servicePlan: item.addOnPlanName,
            servicePlanCode: item.addOnPlanCode,
            isPrice: item.addOnPlanIsPrice,
            servicePrice: item.addOnPlanServicePrice,
            isEditable: false,
            isRemovable: false,
          };
          servicePlanItems.push(alterServicePlan);
        });
      }

      if (meServicePlan.typeOfService == MOSQUITO) {
        if (monthsCount < 7) {
          form.agreementLengthId = 1;
        } else {
          form.agreementLengthId = 12;
        }
      }
      setAgreementLengthId(meServicePlan);

      sessionStore.$patch({ servicePlanList: servicePlanItems });
      customerData.servicePlanList = sessionStore.$state.servicePlanList;
      form.servicePlanList = sessionStore.$state.servicePlanList;

      document.getElementById('primaryIsPrice').value = servicePlanItems[0].isPrice;
      document.getElementById('primaryServicePrice').value = servicePlanItems[0].servicePrice;
      document.getElementById('primaryServicePlanId').value = servicePlanItems[0].servicePlanId;
      document.querySelectorAll('#floatingTreatmentTypeSelect option').forEach((opt) => {
        if (
          (opt.value == 2 || opt.value == 3) &&
          servicePlanItems[0].servicePlanId != '12' &&
          servicePlanItems[0].servicePlanId != '11' &&
          servicePlanItems[0].servicePlanId != '35' &&
          servicePlanItems[0].servicePlanId != '13' &&
          servicePlanItems[0].servicePlanId != '60' &&
          servicePlanItems[0].servicePlanId != '16' &&
          servicePlanItems[0].servicePlanId != '34'
        ) {
          opt.disabled = true;
        } else {
          opt.disabled = false;
        }
      });

      servicePlanModal()._hideModal();
      document.querySelector('.modal-backdrop').remove();
    } else {
      // Update a record
      if (sessionStore.$state.servicePlanList) {
        const servicePlanItems = sessionStore.$state.servicePlanList;
        const newServicePlanItems = [];
        const total = servicePlanItems.length;
        let deleteAddons = [];
        let indexDA = 0;
        for (let i = 0; i < total; i++) {
          if (deleteAddons.length !== 0 && deleteAddons[indexDA] === servicePlanItems[i].servicePlanCode) {
            indexDA++;
            continue;
          } else {
            deleteAddons = [];
            indexDA = 0;
          }
          if (servicePlanItems[i].id == servicePlanId) {
            if (addonsServicePlansType[servicePlanItems[i].servicePlanCode]) {
              deleteAddons = addonsServicePlansType[servicePlanItems[i].servicePlanCode];
            } else {
              deleteAddons = [];
            }

            if (
              servicePlanItems[i].servicePlanId === '1' ||
              servicePlanItems[i].servicePlanId === '2' ||
              servicePlanItems[i].servicePlanId === '98' ||
              servicePlanItems[i].servicePlanId === '100'
            ) {
              removeTechNotesOnFloatingFleasTicks();
            }
            if (
              selectOptionsServicePlanValue === '1' ||
              selectOptionsServicePlanValue === '2' ||
              selectOptionsServicePlanValue === '98' ||
              selectOptionsServicePlanValue === '100'
            ) {
              setTechNotesOnFloatingFleasTicks();
            }
            if (servicePlanItems[i].grassType == 15 && servicePlanForm.grassType != 15) {
              deleteWordsOnTechNotes(
                'Service Pro: Please identify grass type and inform Support Center to update account',
              );
            }
            if (servicePlanForm.grassType == 15) {
              setWordsOnTechNotes(
                'Service Pro: Please identify grass type and inform Support Center to update account',
              );
            }
            if (selectOptionsServicePlanValue === '101') {
              setWordsOnTechNotes(
                'Please inspect the premises and provide the proposal and termite inspection agreement to the customer prior to installing bait stations. Total Bait stations needed: ' +
                  servicePlanForm.baitStationsTotal,
              );
            }
            if (servicePlanForm.termiteActivity == true) {
              setWordsOnTechNotes('Customer has indicated that they have termite activity');
            }
            if (
              selectOptionsTextTypeOfServiceValue === TERMITE ||
              selectOptionsTextTypeOfServiceValue === TERMITE_CONTROL
            ) {
              const closeDateGet = document.querySelector('#closeDate .p-inputtext');
              const closeDateValue = closeDateGet.value;

              servicePlanItems[i].lengthOfAgreement = servicePlanForm.warrantyExtension;
              servicePlanItems[i].closeDateValue = closeDateValue;
            }

            if (servicePlanItems[i].servicePlanId == 30 && selectOptionsServicePlanValue != 30) {
              servicePlanForm.customerStatus = ' ';
            }
            servicePlanItems[i].typeOfServiceId = selectOptionsServicePlanValue;
            servicePlanItems[i].typeOfService = selectOptionsTextTypeOfServiceValue;
            servicePlanItems[i].servicePlanId = selectOptionsServicePlanValue;
            servicePlanItems[i].servicePlan = selectOptionsServicePlan;
            servicePlanItems[i].chargeFrequencyId = radioCheckChargeFrequencyValue || 0;
            servicePlanItems[i].chargeFrequency = radioCheckChargeFrequency || '';
            servicePlanItems[i].servicePlanCode = selectOptionsServicePlanCode;
            servicePlanItems[i].serviceFrequencyId = radioCheckServiceFrequencyValue || 0;
            servicePlanItems[i].priceZone = priceZone;
            servicePlanItems[i].monthServicesPlan = monthServicesPlan;
            servicePlanItems[i].isPrice = isPrice;
            servicePlanItems[i].isPricePercentage = isPricePercentage;
            servicePlanItems[i].isPriceTotal = isPriceTotal;
            servicePlanItems[i].servicePrice = servicePrice;
            servicePlanItems[i].servicePricePercentage = servicePricePercentage;
            servicePlanItems[i].servicePriceTotal = servicePriceTotal;
            servicePlanItems[i].treatmentTypeId = treatmentType;
            servicePlanItems[i].minMonths = minMonths.value;
            servicePlanItems[i].maxMonths = maxMonths.value;
            servicePlanItems[i].minMonthQuantity = minMonths.value;
            servicePlanItems[i].maxMonthQuantity = maxMonths.value;
            servicePlanItems[i].RetentionMinimum = minIsPrice.value;
            servicePlanItems[i].season = servicePlanForm.season;
            servicePlanItems[i].grassType = servicePlanForm.grassType;
            servicePlanItems[i].overseed = servicePlanForm.overseed;
            servicePlanItems[i].serviceNeeded = servicePlanForm.serviceNeeded;
            servicePlanItems[i].sqfeetOne = formSqFeet.sqfeetOne;
            servicePlanItems[i].sqfeetTwo = formSqFeet.sqfeetTwo;
            servicePlanItems[i].sqfeetThree = formSqFeet.sqfeetThree;
            servicePlanItems[i].sqfeetTotal = formSqFeet.sqfeetTotal || 0;
            servicePlanItems[i].isEditable = true;
            servicePlanItems[i].isRemovable = i != 0;
            servicePlanItems[i].termiteActivity = servicePlanForm.termiteActivity;
            servicePlanItems[i].termiteStructure = servicePlanForm.termiteStructure;
            servicePlanItems[i].termiteStructureAdditional = servicePlanForm.termiteStructureAdditional;
            servicePlanItems[i].termiteLinearFeet = servicePlanForm.termiteLinearFeet;
            servicePlanItems[i].baitStationsTotal = servicePlanForm.baitStationsTotal;
            servicePlanItems[i].baitStations1 = servicePlanForm.baitStations1;
            servicePlanItems[i].baitStations2 = servicePlanForm.baitStations2;
            servicePlanItems[i].GeofenceIsPrice = servicePlanForm.GeofenceIsPrice;
            servicePlanItems[i].GeofenceServicePrice = servicePlanForm.GeofenceServicePrice;
            servicePlanItems[i].TargetCharge = servicePlanForm.TargetCharge;
            servicePlanItems[i].installDuration = servicePlanForm.installDuration;
            newServicePlanItems.push(servicePlanItems[i]);

            if (
              i === 0 &&
              (selectOptionsTextTypeOfServiceValue === LAWN_WEED ||
                selectOptionsTextTypeOfServiceValue === MOSQUITO ||
                selectOptionsTextTypeOfServiceValue === TERMITE_CONTROL)
            ) {
              alterSPlan.value.forEach((item) => {
                const alterServicePlan = {
                  ...servicePlanItems[i],
                  monthServicesPlan: item.addOnMonths,
                  servicePlanId: item.addOnPlanId,
                  servicePlan: item.addOnPlanName,
                  servicePlanCode: item.addOnPlanCode,
                  isPrice: item.addOnPlanIsPrice,
                  servicePrice: item.addOnPlanServicePrice,
                  isEditable: false,
                  isRemovable: false,
                };
                newServicePlanItems.push(alterServicePlan);
              });
              alterSPlan.value = [];
            }
          } else {
            newServicePlanItems.push(servicePlanItems[i]);
          }
        }

        if (selectOptionsTextTypeOfServiceValue == MOSQUITO) {
          if (monthsCount < 7) {
            form.agreementLengthId = 1;
          } else {
            form.agreementLengthId = 12;
          }
        }
        const mainPlan = newServicePlanItems.find((item) => item.mainPlan);
        if (mainPlan) {
          setAgreementLengthId(mainPlan);
        }

        sessionStore.$patch({ servicePlanList: newServicePlanItems });
        customerData.servicePlanList = sessionStore.$state.servicePlanList;
        form.servicePlanList = sessionStore.$state.servicePlanList;

        document.getElementById('primaryIsPrice').value = servicePlanItems[0].isPrice;
        document.getElementById('primaryServicePrice').value = servicePlanItems[0].servicePrice;
        document.getElementById('primaryServicePlanId').value = servicePlanItems[0].servicePlanId;
        document.querySelectorAll('#floatingTreatmentTypeSelect option').forEach((opt) => {
          if (
            (opt.value == 2 || opt.value == 3) &&
            servicePlanItems[0].servicePlanId != '12' &&
            servicePlanItems[0].servicePlanId != '11' &&
            servicePlanItems[0].servicePlanId != '35' &&
            servicePlanItems[0].servicePlanId != '13' &&
            servicePlanItems[0].servicePlanId != '60' &&
            servicePlanItems[0].servicePlanId != '16' &&
            servicePlanItems[0].servicePlanId != '34'
          ) {
            opt.disabled = true;
          } else {
            opt.disabled = false;
          }
        });
      }
      toast.fire({
        icon: 'success',
        titleText: 'Success',
        html: 'The Services plan has been modified successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
      servicePlanModal()._hideModal();
      document.querySelector('.modal-backdrop').remove();
    }
  }
}
