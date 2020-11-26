import dlcoLookups from './lookups/dlco';
import vaLookups from './lookups/va';
import kcoLookups from './lookups/kco';
function coefficients(lookup, units, sex, age) {
    // @ts-ignore
    // @todo handle bad lookups
    const l = lookup[units][sex][age];
    return {
        Mspline: l[0],
        Sspline: l[1]
    };
}
function m(a, b, c, height, age, Mspline) {
    return Math.exp(a + b * Math.log(height) + c * Math.log(age) + Mspline);
}
function s(a, b, age, Sspline) {
    return Math.exp(a + b * Math.log(age) + Sspline);
}
function lln(M, L, S) {
    return Math.exp(Math.log(M) + Math.log(1 - 1.645 * L * S) / L);
}
function uln(M, L, S) {
    return Math.exp(Math.log(M) + Math.log(1 + 1.645 * L * S) / L);
}
function zscore(M, L, S, measured) {
    return (Math.pow((measured / M), L) - 1) / (L * S);
}
export function dlco(units, sex, height, age, measured) {
    let M, S, L;
    const { Mspline, Sspline } = coefficients(dlcoLookups, units, sex, age);
    if (sex == "Male") {
        if (units == "SI") {
            M = m(-8.129189, 2.018368, -0.012425, height, age, Mspline);
        }
        else {
            // Traditional
            M = m(-7.034920, 2.018368, -0.012425, height, age, Mspline);
        }
        S = s(-1.98996, 0.03536, age, Sspline);
        L = 0.39482;
        // Female
    }
    else {
        if (units == "SI") {
            M = m(-6.253720, 1.618697, -0.015390, height, age, Mspline);
        }
        else {
            // Traditional
            M = m(-5.159451, 1.618697, -0.015390, height, age, Mspline);
        }
        S = s(-1.84162, 0.01379, age, Sspline);
        L = 0.24160;
    }
    const LLN = lln(M, L, S);
    const ULN = uln(M, L, S);
    const ZScore = zscore(M, L, S, measured);
    const predicted = (measured / M) * 100;
    return {
        M,
        LLN,
        ULN,
        ZScore,
        predicted
    };
}
export function va(sex, height, age, measured) {
    let M, S, L;
    // @todo we use "SI" here because there's only one set of unit lookups for va
    const { Mspline, Sspline } = coefficients(vaLookups, "SI", sex, age);
    if (sex == "Male") {
        M = m(-11.086573, 2.430021, 0.097047, height, age, Mspline);
        S = s(-2.20953, 0.01937, age, Sspline);
        L = 0.62559;
    }
    else {
        M = m(-9.873970, 2.182316, 0.082868, height, age, Mspline);
        S = s(-2.08839, 0.01334, age, Sspline);
        L = 0.51919;
    }
    const LLN = lln(M, L, S);
    const ULN = uln(M, L, S);
    const ZScore = zscore(M, L, S, measured);
    const predicted = (measured / M) * 100;
    return {
        M,
        LLN,
        ULN,
        ZScore,
        predicted
    };
}
export function kco(units, sex, height, age, measured) {
    let M, S, L;
    const { Mspline, Sspline } = coefficients(kcoLookups, units, sex, age);
    if (sex == "Male") {
        if (units == "SI") {
            M = m(2.994137, -0.415334, -0.113166, height, age, Mspline);
        }
        else {
            // Traditional
            M = m(4.088408, -0.415334, -0.113166, height, age, Mspline);
        }
        S = s(-1.98186, 0.01460, age, Sspline);
        L = 0.67330;
        // Female
    }
    else {
        if (units == "SI") {
            M = m(4.037222, 0.645656, -0.097395, height, age, Mspline);
        }
        else {
            // Traditional
            M = m(5.131492, 0.645656, -0.097395, height, age, Mspline);
        }
        S = s(-1.63787, -0.07757, age, Sspline);
        L = 0.24160;
    }
    const LLN = lln(M, L, S);
    const ULN = uln(M, L, S);
    const ZScore = zscore(M, L, S, measured);
    const predicted = (measured / M) * 100;
    return {
        M,
        LLN,
        ULN,
        ZScore,
        predicted
    };
}
