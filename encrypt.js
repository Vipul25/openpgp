const fs = require('fs');
const openpgp = require('openpgp');
global.TextDecoder = require('util').TextDecoder;
global.TextEncoder = require('util').TextEncoder;


async function encryptPdfFile(inputFile, outputFile, publicKeyArmored) {
    try {
        // Read the public key
        const pubKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

        // Read the PDF file
        const pdfData = fs.readFileSync(inputFile);

        // Encrypt the PDF file
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({binary:pdfData}),
            encryptionKeys: pubKey,
            format:'binary'
        });

        // Write the encrypted data to a file
        fs.writeFileSync(outputFile, encrypted);

        console.log('PDF file encrypted successfully!');
    } catch (error) {
        console.error('Error encrypting the PDF file: ', error);
    }
}

// Usage:
const inputFile = 'Sample.pdf';
const outputFile = 'encrypted.gpg';
const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEZFirdxYJKwYBBAHaRw8BAQdAk8zycxLCwPoT6OPqExTKZn7/W4lIuPXg
OUDqnGYyJx3NG0pvbiBTbWl0aCA8am9uQGV4YW1wbGUuY29tPsKMBBAWCgA+
BYJkWKt3BAsJBwgJkG5S5gApnorfAxUICgQWAAIBAhkBApsDAh4BFiEErV+O
ygUHo3eclBuoblLmACmeit8AAG9eAQDNjOZ5vlAgorVC75XZtW8MPCRe/k6G
JmPu1dlrC9u+vwEA9nLGI8g7CSVuygOSFvwwgGslea8LYI4XAnTGjkBWJQDO
OARkWKt3EgorBgEEAZdVAQUBAQdAajNDEBP+BPFMLASgf8PjF/PR8Tm0YVs5
1hCXahh2NnsDAQgHwngEGBYIACoFgmRYq3cJkG5S5gApnorfApsMFiEErV+O
ygUHo3eclBuoblLmACmeit8AABjkAP0cG8Uj0jH/fWfd3S7uQYZiCEsV2LyV
MQs5mKlpLrhQKAEA+k7i3rkRbTW4Bru47bxfPXe9+eoGPdZCCkPv0p8EOgg=
=I90L
-----END PGP PUBLIC KEY BLOCK-----`; // replace with the recipient's public key

encryptPdfFile(inputFile, outputFile, publicKey);


