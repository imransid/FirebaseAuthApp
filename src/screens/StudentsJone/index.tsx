import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Card, Text, Button, ActivityIndicator, Appbar, Checkbox } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS_QUERY } from '../../query/getAuser.query';
import { DELETE_USER_MUTATION, UPDATE_PROFILE_MUTATION } from '@/mutation/updateProfile.mutations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigation } from '@react-navigation/native';
import ToastPopUp from '@/utils/Toast.android';
import styles from './styles';

const UserCardList = () => {
    const token = useSelector((state: RootState) => state.users.token);
    const navigation = useNavigation();

    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS_QUERY, {
        context: { headers: { Authorization: `Bearer ${token}` } },
    });

    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
        context: { headers: { Authorization: `Bearer ${token}` } },
        onCompleted: () => {
            ToastPopUp('Approval status updated successfully!');
            refetch(); // Refresh user list
        },
        onError: error => {
            console.error('Error updating approval status:', error);
            ToastPopUp('Failed to update approval status.');
        },
    });

    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        context: { headers: { Authorization: `Bearer ${token}` } },
        onCompleted: () => {
            ToastPopUp('User deleted successfully!');
            refetch(); // Refresh user list after deletion
        },
        onError: error => {
            console.error('Error deleting user:', error);
            ToastPopUp('Failed to delete user.');
        },
    });

    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (data && data.getAllUsers) {
            // Filter out admin users and sort by approval status
            const filteredUsers = data.getAllUsers.filter(user => user.role !== 'admin');

            // Sort users: Not approved users on top (assuming approveStatus is a string like 'true' or 'false')
            const sortedUsers = filteredUsers.sort((a, b) => {
                if (a.approveStatus !== b.approveStatus) {
                    return a.approveStatus === 'true' ? 1 : -1; // 'true' goes to the bottom
                }
                return 0;
            });

            setUsers(sortedUsers);
        }
    }, [data]);

    const handleCheckboxChange = async (userId: string, value: boolean) => {
        try {
            await updateProfile({
                variables: { approveStatus: value, id: parseInt(userId) },
            });
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

    // Function to handle refresh action
    const onRefresh = async () => {
        setRefreshing(true); // Start refreshing animation
        await refetch(); // Fetch new data
        setRefreshing(false); // Stop refreshing animation
    };

    // Function to handle deleting a user
    const handleDelete = (userId: string) => {
        Alert.alert(
            "Delete User",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteUser({
                                variables: { id: parseInt(userId) },
                            });
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />;
    }

    if (error) {
        return <Text style={{ color: 'red', textAlign: 'center' }}>Error loading users.</Text>;
    }

    return (
        <View style={styles.container}>
            {/* Back Header */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Student List" />
                {/* Manual Refresh Button */}
                <Appbar.Action icon="refresh" onPress={onRefresh} />
            </Appbar.Header>

            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={`${item.firstName} ${item.lastName}`} />
                        <Card.Content>
                            <Text>Email: {item.email}</Text>
                            <Text>Role: {item.role}</Text>
                            <View style={styles.row}>
                                <Text>Approval Status:</Text>
                                <Checkbox
                                    status={item.approveStatus === 'true' ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange(item.id, item.approveStatus !== 'true')}
                                />
                            </View>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleDelete(item.id)} color="red">Delete</Button>
                        </Card.Actions>
                    </Card>
                )}
                refreshing={refreshing}  // Connect state
                onRefresh={onRefresh}  // Trigger function on swipe down
            />
        </View>
    );
};

export default UserCardList;
