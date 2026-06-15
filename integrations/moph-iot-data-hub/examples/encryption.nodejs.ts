/**
 * MOPH Health IoT Data Hub — AES-256-GCM encryption (อ้างอิงภาคผนวก ก. ของ API spec V1.10)
 *
 * ใช้เข้ารหัส payload ของ API push (1–3) ก่อนใส่ในฟิลด์ `data`
 * KEY และ NONCE จริง MOPH ส่งให้ทางอีเมล — ค่าด้านล่างเป็น placeholder
 */
import * as crypto from 'crypto';

const KEY: string = 'EXAMPLE-KEY';
const NONCE: string = 'EXAMPLE-KEY-NONCE';

const textToEncrypt: string = 'Hello World';
const encryptedText: string = encrypt(textToEncrypt, KEY);
console.log('Encrypted text:', encryptedText);
const encryptedData: string = decrypt(encryptedText, KEY);
console.log('Encrypted data:', encryptedData);

function encrypt(data: string, key: string): string {
  try {
    // Derive key using SHA-256
    const derivedKey: Buffer = crypto.createHash('sha256').update(key, 'utf8').digest();

    if (derivedKey.length !== 32) {
      throw new Error('Key must be 32 bytes long for AES-256-GCM');
    }

    // Create nonce (12 bytes, pad/truncate จากสตริง NONCE)
    const nonceBytes: Buffer = Buffer.alloc(12);
    const nonceBuffer: Buffer = Buffer.from(NONCE, 'utf-8');
    const len: number = Math.min(nonceBuffer.length, 12);
    nonceBuffer.copy(nonceBytes, 0, 0, len);

    // Create cipher instance
    const cipher: crypto.CipherGCM = crypto.createCipheriv('aes-256-gcm', derivedKey, nonceBytes);

    // Encrypt the data
    let ciphertext: Buffer = cipher.update(data, 'utf8');
    ciphertext = Buffer.concat([ciphertext, cipher.final()]);

    // Get the auth tag
    const authTag: Buffer = cipher.getAuthTag();

    // Combine ciphertext and auth tag and encode to base64
    const ciphertextWithAuthTag: Buffer = Buffer.concat([ciphertext, authTag]);
    return ciphertextWithAuthTag.toString('base64');
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

function decrypt(encryptedText: string, key: string): string {
  try {
    const derivedKey: Buffer = crypto.createHash('sha256').update(key, 'utf8').digest();
    if (derivedKey.length !== 32) {
      throw new Error('Key must be 32 bytes long for AES-256-GCM');
    }

    // AES-256-GCM expects a 12-byte nonce
    const nonceBytes: Buffer = Buffer.alloc(12);
    const nonceBuffer: Buffer = Buffer.from(NONCE, 'utf-8');
    const len: number = Math.min(nonceBuffer.length, 12);
    nonceBuffer.copy(nonceBytes, 0, 0, len);

    // Convert the base64 encoded ciphertext to a buffer
    const ciphertextWithAuthTag: Buffer = Buffer.from(encryptedText, 'base64');

    // Split the ciphertext and the auth tag (last 16 bytes)
    const ciphertext: Buffer = ciphertextWithAuthTag.subarray(0, -16);
    const authTag: Buffer = ciphertextWithAuthTag.subarray(-16);

    // Create decipher instance
    const decipher: crypto.DecipherGCM = crypto.createDecipheriv('aes-256-gcm', derivedKey, nonceBytes);
    decipher.setAuthTag(authTag);

    // Decrypt the ciphertext
    let plaintext: Buffer = decipher.update(ciphertext);
    plaintext = Buffer.concat([plaintext, decipher.final()]);

    return plaintext.toString('utf8');
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

export { encrypt, decrypt };
