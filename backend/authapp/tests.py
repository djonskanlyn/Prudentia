from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.core import mail

class LoginTestCase(APITestCase):
    
    def setUp(self):
        # Create a user for login tests
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login_with_valid_credentials(self):
        url = reverse('token_obtain_pair')  # URL for obtaining JWT tokens
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_with_invalid_credentials(self):
        url = reverse('token_obtain_pair')
        data = {
            'username': 'wronguser',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class RegisterTestCase(TestCase):
    def setUp(self):
        # Setup any needed initial data here
        self.register_url = reverse('register')

    def test_register_with_valid_data(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword123',
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_with_missing_data(self):
        data = {
            'username': '',
            'email': 'testuser@example.com',
            'password': 'testpassword123',
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_with_duplicate_username(self):
        # Create a user first
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword123',
        }
        self.client.post(self.register_url, data, format='json')

        # Try registering with the same username
        duplicate_data = {
            'username': 'testuser',
            'email': 'newuser@example.com',
            'password': 'newpassword123',
        }
        response = self.client.post(self.register_url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class PasswordResetTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpassword123')
        self.password_reset_url = reverse('password_reset')

    def test_password_reset_email_sent(self):
        # Test if the password reset email is sent
        response = self.client.post(self.password_reset_url, {'email': self.user.email}, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK) # Check if the final response is 200 OK
        self.assertEqual(len(mail.outbox), 1)  # Check if one email has been sent
        self.assertIn('Password reset on', mail.outbox[0].subject)

    def test_password_reset_with_invalid_email(self):
        # Test with an invalid email
        response = self.client.post(self.password_reset_url, {'email': 'invalid@example.com'}, follow=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 0)  # No email should be sent for invalid email

    def test_password_reset_complete(self):
        # Request a password reset
        response = self.client.post(self.password_reset_url, {'email': self.user.email})

        # Ensure an email was sent
        self.assertEqual(len(mail.outbox), 1)
        
        # Extract the reset link from the email body
        reset_link = mail.outbox[0].body.split('http://testserver')[1]
        
        # Extract the uid and token from the reset link
        uid = reset_link.split('/')[-3]  # UIDB64 token from the link
        token = reset_link.split('/')[-2]  # Token from the link
        
        # Use the extracted UID and token to post the new password
        reset_confirm_url = reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
        reset_response = self.client.post(reset_confirm_url, {
            'new_password1': 'newpass123',
            'new_password2': 'newpass123',
        }, follow=True)
        
        # Ensure password reset confirmation is successful
        self.assertEqual(reset_response.status_code, 200)






