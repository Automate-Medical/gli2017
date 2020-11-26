# GLI2017

A TypeScript implementation of Global Lung Function Initiative's reference values for the carbon monoxide transfer factor for Caucasians

## Background

> Diffusing capacity of the lung (DL) (also known as Transfer factor is another expression for the formerly used diffusing capacity.) measures the transfer of gas from air in the lung, to the red blood cells in lung blood vessels. It is part of a comprehensive series of pulmonary function tests to determine the overall ability of the lung to transport gas into and out of the blood. DL, especially DLCO, is reduced in certain diseases of the lung and heart. DLCO measurement has been standardized according to a position paper by a task force of the European Respiratory and American Thoracic Societies.

This module implements the reference value equations specified in [Official ERS technical standards: Global Lung Function Initiative reference values for the carbon monoxide transfer factor for Caucasians](https://www.ers-education.org/lr/show-details/?idP=206432) and includes the [later corrections published in 2020](https://erj.ersjournals.com/content/56/4/1750010).

## Installation

`npm install @automate-medical/gli2017`

Please note: 

* `@automate-medical/gli2017` is packaged as a **native ES module** only. Your runtime must support native modules (i.e. Node >= 13). 
* `@automate-medical/gli2017` is written in **TypeScript**, declarations are packaged with the build.

## Usage

This module exports three functions `dlco`, `kco`, and `va`. They each return the expected measurement (M), the percentage of actual vs expected, the upper limit of normal, the lower limit of normal, and a Z-score corresponding to the actual's performance.

Please see the TypeScript annotations for a full list of function arguments and the return values.

An example to display the Zscore from a DLCO of a 30 year old male measuring 165cm using SI units:

```
import { dlco } from '@automate-medical/gli2017';

const result = dlco({ units: "SI", age: 31, height: 165, measured: 22.3 });
console.log(result.zscore);
```

Note that, currently, this implementation uses GLI's coefficient lookup tables based on 0.25 increments of age (i.e. 30, 30.25, 30.5, 30.75 etc). You must provide an `age` with an exact value provided in the lookup tables.

## Notice

This repository is provided for educational purposes only, it has not been reviewed and cannot be used in a clinical practice.

