<?php
/**
 * MOPH Health IoT Data Hub — AES-256-GCM encryption (อ้างอิงภาคผนวก ข. ของ API spec V1.10)
 *
 * ต้องเปิด extension: php_openssl
 * KEY และ NONCE จริง MOPH ส่งให้ทางอีเมล — ค่าด้านล่างเป็น placeholder
 */

class Crypto
{
    private const KEY = "EXAMPLE-KEY";
    private const NONCE = "EXAMPLE-KEY-NONCE";
    private const CIPHER = "aes-256-gcm";
    private const TAG_LENGTH = 16;

    public static function encrypt(string $data): string
    {
        try {
            // Derive key using SHA-256
            $derivedKey = hash('sha256', self::KEY, true);
            if (strlen($derivedKey) !== 32) {
                throw new Exception('Key must be 32 bytes long for AES-256-GCM');
            }

            // Create nonce (12 bytes)
            $nonceBytes = str_pad(
                substr(self::NONCE, 0, 12),
                12,
                "\0"
            );

            // Generate auth tag - will be filled by openssl_encrypt
            $authTag = '';

            // Encrypt the data
            $ciphertext = openssl_encrypt(
                $data,
                self::CIPHER,
                $derivedKey,
                OPENSSL_RAW_DATA,
                $nonceBytes,
                $authTag
            );
            if ($ciphertext === false) {
                throw new Exception('Encryption failed: ' . openssl_error_string());
            }

            // Combine ciphertext and auth tag and encode to base64
            return base64_encode($ciphertext . $authTag);
        } catch (Exception $e) {
            error_log('Encryption failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public static function decrypt(string $encryptedText): string
    {
        try {
            // Derive key using SHA-256
            $derivedKey = hash('sha256', self::KEY, true);
            if (strlen($derivedKey) !== 32) {
                throw new Exception('Key must be 32 bytes long for AES-256-GCM');
            }

            // Create nonce (12 bytes)
            $nonceBytes = str_pad(
                substr(self::NONCE, 0, 12),
                12,
                "\0"
            );

            // Decode the base64 input
            $ciphertextWithAuthTag = base64_decode($encryptedText);

            // Split ciphertext and auth tag (last 16 bytes)
            $ciphertext = substr($ciphertextWithAuthTag, 0, -self::TAG_LENGTH);
            $authTag = substr($ciphertextWithAuthTag, -self::TAG_LENGTH);

            // Decrypt the data
            $plaintext = openssl_decrypt(
                $ciphertext,
                self::CIPHER,
                $derivedKey,
                OPENSSL_RAW_DATA,
                $nonceBytes,
                $authTag
            );

            if ($plaintext === false) {
                throw new Exception('Decryption failed: ' . openssl_error_string());
            }

            return $plaintext;
        } catch (Exception $e) {
            error_log('Decryption failed: ' . $e->getMessage());
            throw $e;
        }
    }
}

try {
    $textToEncrypt = "Hello World";
    $encryptedText = Crypto::encrypt($textToEncrypt);
    echo "Encrypted text: " . $encryptedText . "\n";

    $decryptedText = Crypto::decrypt($encryptedText);
    echo "Decrypted text: " . $decryptedText . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
