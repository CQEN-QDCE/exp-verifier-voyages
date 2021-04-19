const VaccinationStatus = {

    isVaccinated(isVaccinated) {
        localStorage.setItem('isVaccinated', isVaccinated);
    },

    removeStaus() {
        localStorage.removeItem('isVaccinated');
    },

    getVaccinationStatus() {
        return localStorage.getItem('isVaccinated');
    }
};

export default VaccinationStatus;