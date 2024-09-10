export interface FormData {
    email: string;
    nombreCompleto: string;
    age: string;
    nombreUsuario: string;
    country: string;
    password: string;
}

export interface Country {
    value: string;
    label: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
}
//Country select

export interface CountrySelectProps {
    onCountryChange: (countryName: string) => void; // Ahora recibe solo el nombre del país
}