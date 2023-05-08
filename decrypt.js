const fs = require('fs');
const openpgp = require('openpgp');
global.TextDecoder = require('util').TextDecoder;
global.TextEncoder = require('util').TextEncoder;
async function decryptPdfFile(inputFile, outputFile, privateKeyArmored, passphrase) {
    try {
        // Read the private key

        // Decrypt the private key with your passphrase
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
        console.log(privateKey);

        // Read the encrypted file
        const encryptedData = fs.readFileSync(inputFile);

        // Decrypt the file
        const decrypted = await openpgp.decrypt({
            message: await openpgp.readMessage({ binaryMessage: encryptedData }),
            decryptionKeys: privateKey,
            format: 'binary'
        });

        // Write the decrypted data to a file
        fs.writeFileSync(outputFile, decrypted.data);
        console.log('PDF file decrypted successfully!');
    } catch (error) {
        console.error('Error decrypting the PDF file: ', error);
    }
}

// Usage:
const inputFile = 'encrypted.gpg';
const outputFile = 'decrypted.pdf';
const privateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----

xYYEZFirdxYJKwYBBAHaRw8BAQdAk8zycxLCwPoT6OPqExTKZn7/W4lIuPXg
OUDqnGYyJx3+CQMIY4zF8qXjOQ7gGrGG473i5Tx3bYSh9FAGTUPCfcJzbU3y
Ca0QDFgggsKfjeGQzrMrgPDexGzCQDG4oB4DgmhuqGc163l0Kyg6PLSr5Wg3
Zs0bSm9uIFNtaXRoIDxqb25AZXhhbXBsZS5jb20+wowEEBYKAD4FgmRYq3cE
CwkHCAmQblLmACmeit8DFQgKBBYAAgECGQECmwMCHgEWIQStX47KBQejd5yU
G6huUuYAKZ6K3wAAb14BAM2M5nm+UCCitULvldm1bww8JF7+ToYmY+7V2WsL
276/AQD2csYjyDsJJW7KA5IW/DCAayV5rwtgjhcCdMaOQFYlAMeLBGRYq3cS
CisGAQQBl1UBBQEBB0BqM0MQE/4E8UwsBKB/w+MX89HxObRhWznWEJdqGHY2
ewMBCAf+CQMI1RRvKsd4bXHgWf4fB2MknUJU6GEuaGWeJoIU+dfYDnNIkC62
MAENxuKOGlMsiblUJ8nx99W7XzVv+45wwl/aLEFvBHC1U26j5F+ERWkKIMJ4
BBgWCAAqBYJkWKt3CZBuUuYAKZ6K3wKbDBYhBK1fjsoFB6N3nJQbqG5S5gAp
norfAAAY5AD9HBvFI9Ix/31n3d0u7kGGYghLFdi8lTELOZipaS64UCgBAPpO
4t65EW01uAa7uO28Xz13vfnqBj3WQgpD79KfBDoI
=U77B
-----END PGP PRIVATE KEY BLOCK-----`; // replace with the recipient's private key
const passphrase = 'test123'; // replace with the passphrase for the private key

decryptPdfFile(inputFile, outputFile, privateKey, passphrase);
