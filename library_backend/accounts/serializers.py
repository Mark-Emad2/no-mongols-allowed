from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra info to the response
        data['is_admin'] = self.user.is_staff
        data['name']     = self.user.first_name

        return data