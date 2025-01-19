package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.55

import (
	generated1 "app/graph/generated"
	"app/graph/model"
	"app/lib/auth"
	models "app/models/generated"
	"context"
	"fmt"
)

// SignUp is the resolver for the signUp field.
func (r *mutationResolver) SignUp(ctx context.Context, input model.SignUpInput) (*model.SignUpResponse, error) {
	return r.authService.SignUp(ctx, input)
}

// SignIn is the resolver for the signIn field.
func (r *mutationResolver) SignIn(ctx context.Context, input model.SignInInput) (*model.SignInResponse, error) {
	token, validationError, err := r.authService.SignIn(ctx, input)

	if validationError == nil && err == nil {
		auth.SetAuthCookie(ctx, token)
	}

	var responseValidationError string
	if validationError != nil {
		responseValidationError = validationError.Error()
	}
	fmt.Println(token)
	return &model.SignInResponse{ValidationError: responseValidationError, Token: token}, err
}

// CheckSignedIn is the resolver for the checkSignedIn field.
func (r *queryResolver) CheckSignedIn(ctx context.Context) (*model.CheckSignedInResponse, error) {
	user := auth.GetUser(ctx)
	if user == nil {
		return &model.CheckSignedInResponse{IsSignedIn: false}, nil
	}

	return &model.CheckSignedInResponse{IsSignedIn: true}, nil
}

// CreatedAt is the resolver for the createdAt field.
func (r *userResolver) CreatedAt(ctx context.Context, obj *models.User) (string, error) {
	return obj.CreatedAt.Format("2006-01-02 15:04:05"), nil
}

// UpdatedAt is the resolver for the updatedAt field.
func (r *userResolver) UpdatedAt(ctx context.Context, obj *models.User) (string, error) {
	return obj.UpdatedAt.Format("2006-01-02 15:04:05"), nil
}

// NameAndEmail is the resolver for the nameAndEmail field.
func (r *userResolver) NameAndEmail(ctx context.Context, obj *models.User) (string, error) {
	return obj.Name + "_" + obj.Email, nil
}

// User returns generated1.UserResolver implementation.
func (r *Resolver) User() generated1.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
