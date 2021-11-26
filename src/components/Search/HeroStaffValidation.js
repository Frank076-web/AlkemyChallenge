//Funcion para evaluar la cantidad de heroes que existen actualmente en el equipo, si no supera los seis, se devuelve true para continuar con la validacion y aceptacion del nuevo heroe
export const isStaffFull = (staff) => {
    if (staff) {
        return staff.length === 6;
    }
};

//Función para valuar si el heroe ya existe en el equipo
export function heroeAlreadyExist(staff, heroe) {
    if (staff) {
        const exist = staff.find((hero) => {
            return hero.id === heroe.id;
        });
        if (exist) return true;
    }
    return false;
}

//Funcion para evaluar la orientacion del heroe, compararlo con el equipo actual y decidir si agregarlo o no
export const heroeAlignment = (staff) => {
    let alignmentStaff = {
        good: 0,
        bad: 0
    };
    if (staff) {
        staff.forEach((hero) => {
            if (hero.alignment === 'good') {
                alignmentStaff.good++;
            }
            if (hero.alignment === 'bad') {
                alignmentStaff.bad++;
            }
        });
    }
    return alignmentStaff;
};

//Funcion para agregar el heroe al equipo en caso de positiva evaluación
export const addToStaff = (staff, heroe, orientation) => {
    // console.log(heroe.alignment);
    if (orientation.good === 3 && heroe.alignment === 'good') {
        return alert('El equipo ya tiene 3 heroes buenos');
    }

    if (orientation.bad === 3 && heroe.alignment === 'bad') {
        return alert('El equipo ya tiene 3 heroes malos');
    }

    if (heroe.alignment === 'neutral' || heroe.alignment === '-') {
        return alert(
            'El heroe no tiene orientación, debe elegir tres buenos y tres malos'
        );
    }

    let newStaff = [];
    if (staff) {
        newStaff = [...staff, heroe];
    } else {
        newStaff = [heroe];
    }
    localStorage.removeItem('staff');
    localStorage.setItem('staff', JSON.stringify(newStaff));
};
