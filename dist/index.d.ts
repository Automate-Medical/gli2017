declare type units = "SI" | "Traditional";
declare type sex = "Male" | "Female";
interface GLI2017Result {
    M: number;
    LLN: number;
    ULN: number;
    ZScore: number;
    predicted: number;
}
export declare function dlco(units: units, sex: sex, height: number, age: number, measured: number): GLI2017Result;
export declare function va(sex: sex, height: number, age: number, measured: number): GLI2017Result;
export declare function kco(units: units, sex: sex, height: number, age: number, measured: number): GLI2017Result;
export {};
